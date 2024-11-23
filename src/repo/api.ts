class Api {
  public BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/';
    public SITE_INFORMATIONS = this.BASE_URL + '/site-informations';
    public CATEGORY = this.BASE_URL + '/category';
    public POST = this.BASE_URL + '/post';
    public TAG = this.BASE_URL + '/tag';
}

export default new Api();
