package com.learn.network;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

public class Client {
  private final String HOST = "127.0.0.1";
  private final int PORT = 6666;

  public void start() throws IOException {
    System.out.println("client start...");

    Socket socket = new Socket(HOST, PORT);

    OutputStream out = socket.getOutputStream();

    out.write("客户端发送信息".getBytes());

    socket.close();
  }

  public static void main(String[] args) throws IOException {
    Client client = new Client();
    client.start();
  }

}











