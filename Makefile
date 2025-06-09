gen:
	@protoc \
		--proto_path=proto proto/a.proto \
		--go_out=grpcclient/common --go_opt=paths=source_relative \
		--go-grpc_out=grpcclient/common --go-grpc_opt=paths=source_relative

gen2:
	@python -m grpc_tools.protoc \
		-Iproto \
		--python_out=pythonserver \
		--grpc_python_out=pythonserver \
		proto/a.proto
