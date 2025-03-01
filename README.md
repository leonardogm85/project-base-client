### Steps to install the project in Docker:

1. Clone the repositories from GitHub:

~~~
git clone https://github.com/leonardogm85/project-base-server.git
~~~

~~~
git clone https://github.com/leonardogm85/project-base-server.git
~~~

2. Create the Docker network:

~~~
docker network create project-base-network
~~~

3. Pull the images from DockerHub:

~~~
docker image pull mcr.microsoft.com/mssql/server:2022-latest
~~~

~~~
docker image pull mcr.microsoft.com/dotnet/core/sdk:3.0
~~~

~~~
docker image pull mcr.microsoft.com/dotnet/core/aspnet:3.0
~~~

~~~
docker image pull node:10.24.1
~~~

~~~
docker image pull nginx:latest
~~~

4. Enter the server project directory:

~~~
cd ./project-base-server/
~~~

5. Build the Docker images:

~~~
docker image build -t project-base-migration:1.0.0 -f src/ProjetoBase.Service/Migration.Dockerfile .
~~~

~~~
docker image build -t project-base-server:1.0.0 -f src/ProjetoBase.Service/Application.Dockerfile .
~~~

6. Enter the client project directory:

~~~
cd ../project-base-client/
~~~

7. Build the Docker image:

~~~
docker image build -t project-base-client:1.0.0 -f Dockerfile .
~~~

8. Run the Docker containers:

~~~
docker container run -d --network project-base-network --name project-base-database -p 4010:1433 -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong@Password" -e "MSSQL_PID=Developer" mcr.microsoft.com/mssql/server:2022-latest
~~~

~~~
docker container run -d --network project-base-network --name project-base-migration project-base-migration:1.0.0
~~~

~~~
docker container run -d --network project-base-network --name project-base-server -p 4020:80 -e "ASPNETCORE_ENVIRONMENT=Development" project-base-server:1.0.0
~~~

~~~
docker container run -d --network project-base-network --name project-base-client -p 4030:80 project-base-client:1.0.0
~~~

9. Access the client application:

~~~
http://localhost:4030/
~~~

10. Access the server application:

~~~
http://localhost:4020/
~~~

11. Access the database:

~~~
Server=localhost,4010
User=sa
Password=yourStrong@Password
~~~
