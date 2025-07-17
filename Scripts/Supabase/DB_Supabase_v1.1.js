class DB_Supabase {
  supabase;
  session;
  user_id;
  f_analitico;
  f_estrategico;

  constructor(url, key) {
    this.supabase = supabase.createClient(url, key);
  }

  async getSessionData() {
    // RETRIEVE USER SESSION
    const { data } = await this.supabase.auth.getSession();
    this.session = data.session;
    return data;
  }

  async checkUserLogged() {
    const { session } = await this.getSessionData();
    if (session) {
      this.userLogged();
    } else {
      this.userNotLogged();
    }
  }
  userLogged() {
    // If page is not the login
    if (window.location.pathname === "/") {
      // Redirects
      window.location.replace("https://nc-criar.webflow.io/framework");
    }
    this.user_id = this.session.user.id;

    this.getUserFrameworkData();
  }
  userNotLogged() {
    // If page is not the login
    if (window.location.pathname !== "/") {
      // Redirects
      window.location.replace("https://nc-criar.webflow.io");
    }
  }

  /**=============
   **   LOGIN
   *===========**/
  async userSignIn(email, password) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if(error){
      console.log(error);
      alert("Erro ao fazer login");
    } else {
      this.user_id = data.user.id;
      this.userLogged();
    }
  }

  async userSignUp(email, password, name, last_name) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          last_name: last_name,
        },
      },
    });

    if (error) {
      console.log(data, error);
      return;
    } else {
      await this.createUserFrameworkData(data.user.id);

      this.userLogged();
    }
  }

  async userSignOut() {
    const { error } = await this.supabase.auth.signOut();

    error ? console.log(error) : null;
  }

  /**=============
   **  SOLUCOES
   *===========**/
  async fetchSolucoesData() {
    const { data, error } = await this.supabase.from("Solucoes").select();
    return data;
  }
  /**=============
   **  COMPLEMENTOS
   *===========**/
  async fetchComplementosData() {
    const { data, error } = await this.supabase.from("Complementos").select();
    return data;
  }
  /**=============
   **  SERVICOS
   *===========**/
  async fetchServicosData() {
    const { data, error } = await this.supabase.from("Servicos").select();
    return data;
  }

  /**=======================
   **  USER FRAMEWORK DATA
   *=====================**/
  async createUserFrameworkData(user_id) {
    const { error } = await this.supabase
      .from("User_Framework_Data")
      .insert({ user_id: user_id });
  }

  async getUserFrameworkData() {
    const { data, error } = await this.supabase
      .from("User_Framework_Data")
      .select();
    this.f_analitico = JSON.parse(data[0].framework_analitico);
    this.f_estrategico = JSON.parse(data[0].framework_estrategico);
    return data;
  }

  async setUserFrameworkAnaliticoData(data) {
    const { error } = await this.supabase
      .from("User_Framework_Data")
      .update({ framework_analitico: data })
      .eq("user_id", this.user_id);

    return error;
  }
  async setUserFrameworkEstrategicoData(data) {
    const { error } = await this.supabase
      .from("User_Framework_Data")
      .update({ framework_estrategico: data })
      .eq("user_id", this.user_id);

    return error;
  }
}
