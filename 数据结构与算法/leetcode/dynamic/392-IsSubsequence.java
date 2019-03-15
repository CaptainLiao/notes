    public boolean isSubsequence(String s, String t) {
        int slen = s.length();
        int tlen = t.length();
        int i = 0;
        int j = 0;
        char[] cs = s.toCharArray();
        char[] ct = t.toCharArray();
        
        while(i < slen && j < tlen) {
            if (cs[i] == ct[j]) ++i;
            ++j;
        }
        
        return i == slen;
    }