import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { fetchUser } from '../store/actions/user.action';

function List (props) {
  const { user, dispatch } = props
  useEffect(() => {
    dispatch(fetchUser())
  }, []);

  return (
    <div>
      List page Working
      <ul>
        {
          user.map(item => (
            <li key={item.id}>
              {item.name}
            </li>))
        }
      </ul>
    </div>
  )
}

export function loadData (store) {
  return store.dispatch(fetchUser())
}

const mapStateToProps = (state) => ({
  user: state.user
})


export default {
  component: connect(mapStateToProps)(List),
  loadData
}

