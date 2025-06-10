import { useEffect, useState ,} from "react";
import type { Question } from "../types/types";
import { userQuestionService } from "../services/UserQuestion";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { MessageSquare, Plus } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const QuestionPageId: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (id) {
        loadQuestion(id);
        }
    }, [id]);
    
    const loadQuestion = async (questionId: string) => {
        try {
        const response = await userQuestionService.getQuestionById(questionId);
        setQuestion(response);
        } catch (error) {
        console.error("Error loading question:", error);
        } finally {
        setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="text-xl font-medium text-gray-700">Loading question...</div>
        </div>
        );
    }
    const getDomainName = (domainId: number) => {
    return question?.domains.name ? question?.domains.name : `Domain ${domainId}`;
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
    
    if (!question) {
        return <div className="text-red-500">Question not found</div>;
    }
    
    return (
       <Card key={question.id} className="p-6">
            <div className="flex items-start justify-between" 
            >
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
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {question.domains.name}
                </h2>
                <div className="flex items-center justify-between"><p className="text-gray-900 leading-relaxed mb-3">
                  Description/About Domain: {question.domains.description}
                </p>
                 <Button
         
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Start Attempt</span>
        </Button>
                </div>
                
                <p className="text-gray-900 leading-relaxed mb-3">
                  Question: {question.text}
                </p>
               

                <p className="text-sm text-gray-500">
                  Created: {new Date(question.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
    );
    }