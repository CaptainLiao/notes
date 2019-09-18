package com.learn.network;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
  private final String HOST = "127.0.0.1";
  private final int PORT = 6666;

  public void start() throws IOException {
    System.out.println("server start...");

    ServerSocket serverSocket = new ServerSocket(PORT);

    Socket socket = serverSocket.accept();
    String ip = socket.getInetAddress().getHostAddress();
    System.out.println(ip + "... connected!");

    InputStream in = socket.getInputStream();
    byte[] bytes = new byte[1024];
    int len = in.read(bytes);
    String res = new String(bytes, 0, len);

    System.out.println(res);

    socket.close();
    serverSocket.close();
  }

  public static void main(String[] args) throws IOException {
    Server server = new Server();
    server.start();
  }
}
























