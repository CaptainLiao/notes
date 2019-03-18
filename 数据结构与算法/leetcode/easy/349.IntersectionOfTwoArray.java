class Solution {
  public int[] intersection(int[] nums1, int[] nums2) {
    Map<Integer, Boolean> map = new HashMap();
    for (int n : nums1)
      map.put(n, true);

    List<Integer> list = new ArrayList();
    for (int n : nums2) {
      if (map.get(n) != null) {
        list.add(n);
        map.remove(n);
      }
    }

    return list.stream().map(i => i).toArray();
  }
}