package service

import (
	"context"
	"log"

	pb "grpcclient/common"
	"grpcclient/model"

	"google.golang.org/grpc"

	"google.golang.org/grpc/credentials/insecure"
)

func GrpcClient(request model.RequestModel, response *model.AIResponse) (*model.AIResponse, error) {
	// Create a dialer with insecure credentials (no TLS)
	dialer := grpc.WithTransportCredentials(insecure.NewCredentials())

	// Create the connection using grpc.Dial (not grpc.NewClient)
	conn, err := grpc.Dial("localhost:50051", dialer)
	if err != nil {
		log.Printf("Failed to connect: %v", err)
		return nil, err
	}
	defer conn.Close()

	// Create the gRPC client
	client := pb.NewUserSubmittionServiceClient(conn)

	// Prepare the request
	req := &pb.UserSubmittion{
		Question:   request.Question,
		Answer:     request.Answer,
		UserId:     request.UserId,
		ResponceId: request.ResponceId,
	}

	// Call the SubmitUserSubmittion RPC method
	resp, err := client.SubmitUserSubmittion(context.Background(), req)
	if err != nil {
		log.Printf("SubmitUserSubmittion error: %v", err)
		return nil, err
	}

	// Map the response
	response.Question = resp.Question
	response.Answer = resp.Answer
	response.UserId = resp.UserId
	response.Clarity = resp.Clarity
	response.Tone = resp.Tone
	response.Relevance = resp.Relevance
	response.OverallScore = resp.OverallScore
	response.Suggestion = resp.Suggestio

	return response, nil
}
