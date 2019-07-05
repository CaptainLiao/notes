
import java.util.ArrayDeque;
import java.util.HashSet;
import java.util.Queue;
import java.util.Set;

public class App {
	public static int openLock(String[] deadends, String target) {
		String initStr = "0000";
		Set<String> visited = new HashSet<String>();
		for (String d : deadends) {
			visited.add(d);
		}
			
		if (visited.contains(initStr)) {
			return -1;
		}
			

		Queue<String> queue = new ArrayDeque<String>();
		visited.add(initStr);
		queue.add(initStr);

		int count = 0;
		int[] type = { 1, -1 };

		while (!queue.isEmpty()) {
			int size = queue.size();
			for (int i = 0; i < size; i++) {
				String item = queue.poll();
				if (item.equals(target)) {
					return count;
				}

				char[] cs = item.toCharArray();
				for (int j = 0; j < cs.length; j++) {
					for (int k = 0; k < 2; k++) {
						int t = (cs[j] - '0' + type[k] + 10) % 10;
						cs[j] = (char) (t + '0');
						String temp = new String(cs);

						if (!visited.contains(temp)) {
							visited.add(temp);
							queue.add(temp);
						}
					}
				}
			}
			++count;
		}

		return -1;
	}

	public static void main(String[] args) {
		String[] deads = { "0201", "0101", "0102", "1212", "2002" };
		int res = openLock(deads, "2002");
		System.out.println(res);
	}
}
