
import { MockMethod } from 'vite-plugin-mock'

const list = () : any => {
  const result = []
  const total = 100
  const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
  const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

  for ( let i = 1; i <= total; i++ ) {
    result.push( {
      id: '@increment',
      timestamp: '@datetime()',
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      content_short: 'mock data',
      content: baseContent,
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft'],
      display_time: '@datetime',
      comment_disabled: true,
      pageviews: '@integer(300, 5000)',
      image_uri,
      platforms: ['a-platform']
    } )
  }

  return result
}

const List = list()

export default [
  {
    url: '/api/article/list',
    method: 'get',
    response: ( config : any ) => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter( ( item : any ) : boolean => {
        if ( importance && item.importance !== +importance ) return false
        if ( type && item.type !== type ) return false
        if ( title && item.title.indexOf( title ) < 0 ) return false
        return true
      } )

      if ( sort === '-id' ) {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter( ( item : any, index : number ) => index < ( limit as number ) * ( page as number ) && index >= ( limit as number ) * ( page as number - 1 ) )

      return {
        code: 200,
        message: 'success',
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/api/article/detail',
    type: 'get',
    response: ( config : any ) => {
      const { id } = config.query
      for ( const article of List ) {
        if ( article.id === +id ) {
          return {
            code: 200,
            message: 'success',
            data: article
          }
        }
      }
    }
  },

  {
    url: '/api/article/pv',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/api/article/create',
    type: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: 'success'
      }
    }
  },

  {
    url: '/api/article/update',
    type: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: 'success'
      }
    }
  }

] as MockMethod[]
