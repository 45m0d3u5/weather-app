import {$image, getImageFx, getWeatherFx, pageOpened} from "./model";
import faker from '@faker-js/faker'
import {allSettled, fork} from "effector";
import {root} from "effector-root";

const imageCreate = () => {
    return {
        data: {
            image: faker.image.imageUrl()
        }
    }
}
const image = imageCreate();

describe('page opened', () => {
    it('should start fetching image', async () => {
        const handleSearchImage = jest.fn(() => image)
        const handleWeatherSearch = jest.fn();
        const handlers = new Map()
            .set(getImageFx, handleSearchImage)
            .set(getWeatherFx, handleWeatherSearch)

        const scope = fork(root, {
            handlers,
        })

        await allSettled(pageOpened, {
            scope,
            params: {},
        })
        expect(handleSearchImage).toBeCalled()
        expect(handleWeatherSearch).toBeCalled()
        expect(scope.getState($image)).toBe(image.data.image)

    })
})