// 90°旋转矩阵

/**
给定一个 n × n 的二维矩阵表示一个图像。
将图像顺时针旋转 90 度。

说明：
你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]

外层循环：4*4
 i j    i j    i j    i j    i j
 0 0 -> 0 3 -> 3 3 -> 3 0 -> 0 0
 0 1 -> 1 3 -> 3 2 -> 2 0 -> 0 1
 0 2 -> 2 3 -> 3 1 -> 1 0 -> 0 2
 0 3 -> 3 3 -> 3 0 -> 0 0 -> 0 3

内层循环 2*2
1 1 -> 1 2 -> 2 2 -> 2 0 -> 0 1

*/

class Solution {
public:
    void rotate1(vector<vector<string>>& matrix) {
        if( matrix.empty() ) return;

        for( int layer = 0; layer < matrix.size()/2; ++layer ) {
            int first = layer;
            int last = matrix.size() - first - 1;
            
            for( int i = first; i < last; ++i ) {
              int temp = matrix[first][i];
              matrix[first][i] = matrix[last - i + layer][first];
			        matrix[last - i + layer][first] = matrix[last][last - i + layer];
			        matrix[last][last - i + layer] = matrix[i][last];
			        matrix[i][last] = tmp
            }
        }
    }
    void rotate(vector<vector<string>>& matrix) {
      if( matrix.empty() ) return;

      // 逆序行
      int temp;
      int len =  matrix.size();
      int i;
      int j;
      for( i = 0; i < len/2; ++i ) {
        for( j = 0; j < len; ++j ) {
          temp = matrix[i][j];
          matrix[i][j] = matrix[len-1-i][j];
          matrix[len-i-1][j] = temp;
        }
      }
      //交换对角线两边的元素
      for( i = 0; i < len; ++i ) {
        for( j = 0; j < i; ++j ) {
          temp = matrix[i][j];
          matrix[i][j] = matrix[j][i];
          matrix[j][i] = temp;
        }
      }
    }
}
