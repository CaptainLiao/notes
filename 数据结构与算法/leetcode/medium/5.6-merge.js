/**
 *  合并区间
 *  给出一个区间的集合，请合并所有重叠的区间。
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */

function merge(intervals) {
  if (!intervals || !intervals.length) return intervals
  
  intervals.sort((a, b) => a.start - b.start)

  var res = [intervals[0]]
  for (var i = 0, len = intervals.length; i < len; ++i) {
    var r = res[res.length - 1]
    var c = intervals[i]
    if (Math.max(r.start, r.end) < Math.min(c.start, c.end)) {
      res.push(c)
    } else {
      r.start = Math.min(r.start, c.start)
      r.end = Math.max(r.end, c.end)
    }
  }
  return res
} 