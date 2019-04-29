class Solution {
    private boolean isSubsequense(char[] s, char[] t) {
        int slen = s.length;
        int tlen = t.length;
        int i = 0;
        int j = 0;
        
        while( i < slen && j < tlen) {
            if (s[i] == t[j]) ++i;
            ++j;
        }
        
        return i == slen;
    }
    
    
    public int numMatchingSubseq(String S, String[] words) {
        char[] sc = S.toCharArray();
        int num = 0;
        for (String word : words) {
            if (isSubsequense(word.toCharArray(), sc)) ++num;
        }

        return num;
    }
}