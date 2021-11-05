export const defineFilter = (filter) => {
  return {
    type: 'DEFINE',
    filter: filter
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'DEFINE':
      return action.filter
    default: return state
  }
}

export default filterReducer