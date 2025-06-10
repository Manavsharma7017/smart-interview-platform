import { useEffect, useState } from "react";
import type { Domain, Question } from "../types/types";
import { domainService } from "../services/domains";
import { userQuestionService } from "../services/UserQuestion";
import {  Filter, MessageSquare } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export const QuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: '',
    domain: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [questions, filters]);

  const loadData = async () => {
    try {
      const [questionsResponse, domainsResponse] = await Promise.all([
        userQuestionService.getAllUserQuestions(),
        domainService.getAllUserDomains(),
      ]);
      setQuestions(questionsResponse);
      setFilteredQuestions(questionsResponse);
      setDomains(domainsResponse);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterQuestions = () => {
    if (!filters.difficulty && !filters.domain) {
      setFilteredQuestions(questions);
      return;
    }
    userQuestionService
      .getQuestionByfilter({
        difficulty: filters.difficulty || null,
        domainID: filters.domain ? parseInt(filters.domain) : null,
      })
      .then((filtered) => setFilteredQuestions(filtered))
      .catch((err) => {
        console.error("Filter error:", err);
        setFilteredQuestions([]);
      });
  };

  const getDomainName = (domainId: number) => {
    const domain = domains.find((d) => d.id === domainId);
    return domain ? domain.name : `Domain ${domainId}`;
  };

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "easy";
      case "MEDIUM":
        return "medium";
      case "HARD":
        return "hard";
      default:
        return "info";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Questions</h2>
          <p className="text-gray-600">View interview questions across all domains</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filters.difficulty}
              onChange={(e) =>
                setFilters({ ...filters, difficulty: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <select
            value={filters.domain}
            onChange={(e) =>
              setFilters({ ...filters, domain: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Domains</option>
            {domains.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.name}
              </option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredQuestions.length} of {questions.length} questions
          </div>
        </div>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                  </div>
                  <Badge variant={getDifficultyVariant(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                  <Badge variant="info">{getDomainName(question.domain_id)}</Badge>
                </div>

                <p className="text-gray-900 leading-relaxed mb-3">
                  {question.text}
                </p>

                <p className="text-sm text-gray-500">
                  Created: {new Date(question.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <Card className="p-12 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {questions.length === 0
              ? "No questions yet"
              : "No questions match your filters"}
          </h3>
          <p className="text-gray-600 mb-6">
            {questions.length === 0
              ? "Create your first question to get started"
              : "Try adjusting your filters or create a new question"}
          </p>
        </Card>
      )}
    </div>
  );
};
