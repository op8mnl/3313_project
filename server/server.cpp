#include <iostream>
#include <sstream>
#include <string>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

int main()
{
    int PORT = 3001;
    // Create a socket
    int server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket == -1)
    {
        std::cerr << "Failed to create socket" << std::endl;
        return 1;
    }

    // Bind the socket to a port
    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);
    if (bind(server_socket, (struct sockaddr *)&address, sizeof(address)) == -1)
    {
        std::cerr << "Failed to bind socket to port" << std::endl;
        return 1;
    }

    // Listen for incoming connections
    if (listen(server_socket, 3) == -1)
    {
        std::cerr << "Failed to listen for connections" << std::endl;
        return 1;
    }

    // Accept incoming connections and handle them
    while (true)
    {
        int client_socket = accept(server_socket, nullptr, nullptr);
        if (client_socket == -1)
        {
            std::cerr << "Failed to accept incoming connection" << std::endl;
            continue;
        }

        // Read messages from the client
        char buffer[1024] = {0};
        int valread = read(client_socket, buffer, 1024);
        if (valread == -1)
        {
            std::cerr << "Failed to read message from client" << std::endl;
            close(client_socket);
            continue;
        }

        // Send a response back to the client
        std::stringstream response;
        response << "Server received message: " << buffer;
        std::string response_str = response.str();
        send(client_socket, response_str.c_str(), response_str.length(), 0);

        close(client_socket);
    }

    return 0;
}