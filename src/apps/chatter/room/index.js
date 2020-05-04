// Here is a page that will display details about a specific resource.
// In our case, it will be a user specified by the current routes `:id`
// segment.

// We'll include Helmet for setting title and meta tags dynamically,
// based on the result of our API request.
// And we'll use the `useRequest` hook for requesting the resource data.
import Helmet from '@app-elements/helmet'
import LoadingIndicator from '@app-elements/loading-indicator'
import { Link } from '@app-elements/router'
import { useRequest } from '@app-elements/use-request'

// `url` is a util for getting route paths by name. It's a project
// level util because it reads the statically defined [routes.js](/routes.html)
import url from '/util/url'

// We'll need to pass our store to `useRequest`
import store from '/store'

import { WEB_URL } from '/consts'

// Here is our page component which will use the `useRequest` hook.
export default function Room ({ id }) {
  const { result, error, isLoading } = useRequest(store, url('api.room', { args: { id } }))

  if (isLoading) {
    return <div className='container mt-2'><LoadingIndicator /></div>
  }

  if (error != null) {
    return error.code === 404
      ? <div><p>A chatroom with that name was not found!</p></div>
      : <div><p>Something went wrong!</p></div>
  }

  const { name } = result

  return (
    <div key='user' className='container pt-7'>
      <Helmet
        title={id}
        meta={[
          { name: 'description', content: 'Helmet description' },
          { property: 'og:type', content: 'article' },
          { property: 'og:title', content: name },
          { property: 'og:description', content: 'Helmet description' },
          { property: 'og:image', content: 'https://www.gooseinsurance.com/images/blog-image-1.jpg' },
          { property: 'og:url', content: `${WEB_URL}${url('api.room', { args: { id } })}` }
        ]}
      />
      <h1>{name}</h1>
      <p><Link name='rooms'>&larr; Back to all rooms</Link></p>
    </div>
  )
}
