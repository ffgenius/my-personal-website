import { immer } from 'zustand/middleware/immer'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

interface State {
  cats: {
    bigCats: number,
    smallCats: number,
  },
  addBigCat: () => void,
  addSmallCat: () => void,
  summary: () => void,
}

const useCount = createWithEqualityFn<State>()(
  immer(
    devtools(
      persist(
        subscribeWithSelector(
          (set, get) => ({
            cats: {
              bigCats: 0,
              smallCats: 0,
            },
            addBigCat: () => {
              set((state) => {
                state.cats.bigCats++
              })
            },
            addSmallCat: () => {
              set((state) => {
                state.cats.smallCats++
              })
            },
            summary: () => {
              return get().cats.bigCats + get().cats.smallCats
            }
          })
        ),
        {
          name: 'cats'
        }
      ),
      {
        enabled: true,
        name: 'user'
      }
    )
  )
)

export default useCount
