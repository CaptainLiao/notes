import React, { PureComponent } from 'react'
import style from './article.scss'
import png from './1.png'

export default class Article extends PureComponent {
  componentDidMount() {
    alert(1)
  }
  render() {
    return (
      <div className={style.article}>
        <img src={png} alt="1.png" />
        我是一个粉刷匠，啦啦啦
      </div>
    )
  }
}