import factory from 'factory-girl'
import Page, { PageInterface } from '../src/app/models/Page'

factory.define('page', Page, {
  url: 'listadecompras'
})

export const createPage = async (): Promise<PageInterface> => {
  const page = await factory.build<PageInterface>('page')
  await page.save()
  return page
}
