import React, {PureComponent} from 'react'
import style from './lists.scss'

export default class Lists extends React.Component {
  state = {
    lists: [
      {name: 'minooo'},
      {name: '刘德华'},
      {name: '郭富城'},
      {name: '黎明'},
      {name: '黎明'},
      {name: '黎明333'},
    ]
  };

  componentDidMount() {
    alert(1)
  }

  render() {
    const {lists} = this.state;
    return (
      <ul className={style.lists}>
        {
          lists.map((item, index) =>
            <li key={index}>我叫：{item.name}</li>
          )
        }
      </ul>
    )
  }
}