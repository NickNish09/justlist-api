import factory from 'factory-girl'
import Page, { PageInterface } from '../src/app/models/Page'

factory.define('page', Page, {
  url: 'listadecompras'
})

export const createPage = async (url?: string): Promise<PageInterface> => {
  let page: PageInterface
  if (url !== undefined) {
    page = await factory.build<PageInterface>('page', { url })
  } else {
    page = await factory.build<PageInterface>('page')
  }
  await page.save()
  return page
}
