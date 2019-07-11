package com.liaofy.spring.service;

import java.util.ArrayList;
import java.util.List;

public class MinStack {
	private List<Integer> data;
	private Integer min = null;
	
	public MinStack() {
		data = new ArrayList<Integer>();
	}
	
	public void push(int x) {
		if (min == null) min = x;
		
		data.add(x - min);

		if (x < min) min = x;
	}
	public void pop() {
		if (isEmpty()) return;
		
		int v = data.remove(data.size() - 1);
		if (v < 0) min = min -v;
    if (data.size() == 0) min = null;
	}
	
	public boolean isEmpty() {
		return data.size() <= 0;
	}
	
	public int top() {
		int v = data.get(data.size() - 1);
		if (v < 0) return min;
		return min + v;
	}
	
	public int getMin() {
		return min;
	}
	
	public static void main(String[] args) {
		MinStack s = new MinStack();
		s.push(1);
        s.push(2);
        s.push(3);
        for (int i = 0; i < 4; ++i) {
            if (!s.isEmpty()) {
                System.out.println(s.top());
            }
        }

	}
}
