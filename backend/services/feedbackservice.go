package services

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"errors"

	"github.com/valyala/fasthttp"
)

func GetFeedbackByResponseID(responseID string, feddback *models.Feedback) (*models.Feedback, error) {
	if err := database.DB.Where("ResponseID = ?", responseID).First(feddback).Error; err != nil {
		return nil, err
	}
	return feddback, nil
}

func CreateFeedback(feedback *models.Feedback, jsondata []byte, responseID string) (*models.Feedback, error) {
	// Step 1: Call gRPC server and parse feedback
	req := fasthttp.AcquireRequest()
	defer fasthttp.ReleaseRequest(req)

	// Set HTTP method, headers, and body
	req.Header.SetMethod("POST")
	req.Header.Set("Content-Type", "application/json")
	req.SetRequestURI("http://localhost:8080/grpc/call") // Modify the URL based on your gRPC server endpoint
	req.SetBody(jsondata)

	// Send request and get response
	resp := fasthttp.AcquireResponse()
	defer fasthttp.ReleaseResponse(resp)

	// Handle errors from sending request
	if err := fasthttp.Do(req, resp); err != nil {
		return nil, errors.New("failed to send request to gRPC server")
	}

	// Parse the body response
	body := resp.Body()
	if len(body) == 0 {
		return nil, errors.New("received empty response body from gRPC server")
	}

	// Unmarshal the response body into the Feedback model
	if err := json.Unmarshal(body, feedback); err != nil {
		return nil, errors.New("failed to unmarshal response body into feedback model")
	}

	// Step 2: Set the ResponseID on the feedback
	feedback.ResponseID = responseID

	// Step 3: Save feedback into the database
	if err := database.DB.Create(feedback).Error; err != nil {
		return nil, errors.New("failed to create feedback in the database")
	}

	// Step 4: Fetch the response from the database and associate the feedback using Preload
	var response models.Response
	if err := database.DB.Preload("Feedback").First(&response, "ResponseID = ?", responseID).Error; err != nil {
		return nil, errors.New("response not found")
	}

	// Associate the feedback with the response
	response.Feedback = feedback

	// Step 5: Save the response with the newly associated feedback
	if err := database.DB.Save(&response).Error; err != nil {
		return nil, errors.New("failed to save response with feedback")
	}

	// Return the feedback
	return feedback, nil
}
