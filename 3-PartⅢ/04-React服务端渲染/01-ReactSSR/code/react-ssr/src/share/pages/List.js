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

const mapStateToProps = (state) => ({
  user: state.user
})


export default connect(mapStateToProps)(List)

