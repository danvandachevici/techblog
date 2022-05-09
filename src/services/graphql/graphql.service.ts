import axios, { AxiosError } from 'axios';
import { pageByUrlQuery, pageListingQuery } from './queries';

export class GraphQLService {
  static instance: GraphQLService;
  
  constructor() {}

  static getInstance() {
    if (!GraphQLService.instance) {
      GraphQLService.instance = new GraphQLService();
    }
    return GraphQLService.instance;
  }

  private _graphqlRequest(query: string, variables: any): Promise<any> {
    const graphqlUrl: string = process.env.CONTENT_URL || '';
    const graphqlAuth: string = process.env.CONTENT_DELIVERY_API_KEY || '';

    return axios({
      url: graphqlUrl,
      method: 'post',
      data: {
        query,
        variables
      },
      headers: {
        Authorization: `Bearer ${graphqlAuth}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getPageByUrl(url: string): Promise<any> {
    return this._graphqlRequest(pageByUrlQuery, {url}).then((res) => {
      return res.data.data.pageCollection.items[0];
    }).catch((exp: any) => {
      console.log(exp.response.data);
    });
  }

  getAllRoutes(): Promise<any> {
    const curPage: number = 0;
    const itemsPerPage = 10
    const skip = curPage * itemsPerPage;

    return this._graphqlRequest(pageListingQuery, {count: itemsPerPage, skip}).then((res) => {
      return res.data.data.pageCollection.items;
    }).catch((exp: any) => {
      console.error('Exception:', exp.response.data);
      return [];
    });
  }
}