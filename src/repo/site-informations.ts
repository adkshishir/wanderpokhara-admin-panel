import api from './api';
import request from './request';

class SiteInformations {
  async changeSiteInformations(
    formData: SitePayLoad,
    success: (message: string, data: any) => void = () => {},
    failure: (message: string) => void = () => {}
  ) {
    await request.postWithFile({
      endPoint: api.SITE_INFORMATIONS,
      data: formData,
      success,
      failure,
    });
  }
  async getSiteInformations() {}
}

export default new SiteInformations();

export type SitePayLoad = {
  name?: string;
};
