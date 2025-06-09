import grpc
from concurrent import futures
import time

import a_pb2
import a_pb2_grpc

class UserSubmissionServiceServicer(a_pb2_grpc.UserSubmittionServiceServicer):
    def SubmitUserSubmittion(self, request, context):
        print(f"Received from client: {request}")

        response = a_pb2.UserSubmittionResponse(
            Question=request.Question,
            Answer=request.Answer,
            UserId=request.UserId,
            Clarity="High",
            Tone="Professional",
            Relevance="Relevant",
            OverallScore="8.5",
            Suggestio="Make your answer more concise."
        )
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    a_pb2_grpc.add_UserSubmittionServiceServicer_to_server(UserSubmissionServiceServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC Python server running on port 50051...")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        print("Shutting down server.")
        server.stop(0)

if __name__ == '__main__':
    serve()
