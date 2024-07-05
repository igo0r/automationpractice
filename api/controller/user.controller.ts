import { RequestHolder } from '../requestHolder';
import { getUserIdFromDom } from '../../helpers/domParser';
import { SpaceDeletionResponse, SpaceResponse, UserAccountResponse } from '../models/models';
import Product from '../../entities/product';

export class UserController extends RequestHolder {
    async getUserPage(username): Promise<UserAccountResponse> {
        const userPageResponse = await this.request.get(`https://hub.knime.com/${username}`);
        let id = getUserIdFromDom(await userPageResponse.text());

        return { id } as UserAccountResponse;
    }

    async createNewSpace(space: Product, userId: string) {
        const newSpaceResponse = await this.request.put(
            `https://api.hub.knime.com/repository/Users/account%3Auser%3A${userId}/${space.slug}?overwrite=false`,
            {
                data: {
                    private: space.isPrivate,
                    type: 'Product'
                }
            }
        );
        const json = await newSpaceResponse.json();
        return {
            status: newSpaceResponse.status(),
            private: json.private,
            type: json.type,
            id: json.id,
            canonicalPath: json.canonicalPath
        } as SpaceResponse;
    }

    async deleteSpace(space: Product, username: string) {
        const spaceDeletionResponse = await this.request.delete(
            `https://api.hub.knime.com/repository/Users/${username}/${space.slug}`
        );
        return { status: spaceDeletionResponse.status() } as SpaceDeletionResponse;
    }
}
