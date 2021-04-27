
const ERROR_IMAGE = "https://files-82ee7vgzc.now.sh";
const LOADING_IMAGE = "https://files-8bga2nnt0.now.sh";
const AVATAR_LOAD_COMPLETE = 'AVATAR_LOAD_COMPLETE';
const AVATAR_LOAD_ERROR = 'AVATAR_LOAD_ERROR';


const fetchGitHubAvatar = async (user?: string | null): Promise<string | void> => {
  if (!user) return;

  const response = await fetch(`https://api.github.com/users/${user}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { avatar_url } = await response.json();
  return avatar_url;
}

export class GitHubAvatar extends HTMLElement {
  constructor(private url: string = LOADING_IMAGE) {
    super();
  }

  static get events() {
    return {
      AVATAR_LOAD_COMPLETE,
      AVATAR_LOAD_ERROR
    }
  }

  static get observedAttribute() {
    return [ "user" ];
  }

  get user() {
    return this.getAttribute("user");
  }

  set user(user: string | null) {
    if (user) {
      this.setAttribute("user", user);
    } else {
      this.removeAttribute("user");
    }
  }


  connectedCallback() {
    this.render();
    this
      .loadAvatar()
      .then(() => this.render())
  }


  attributeChangedCallback(name: string, prev: string, next: string) {
    if (!this.hasChildNodes()) return;

    if (name === "user") {
      this
        .loadAvatar()
        .then(() => this.render())
    }
  }


  render() {
    requestAnimationFrame(() => {
      this.innerHTML = "";
      const img = document.createElement("img");
      img.src = this.url;
      this.appendChild(img);
    });
  }

  async loadAvatar() {
    try {
      const { user } = this;
      const avatar = await fetchGitHubAvatar(user);
      if (avatar) {
        this.url = avatar;
        this.onLoadAvatarComplete();
      }

    } catch (e) {
      this.url = ERROR_IMAGE;
      this.onLoadAvatarFail(e);
    }
    this.render();
  }


  onLoadAvatarComplete() {
    const event = new CustomEvent(GitHubAvatar.events.AVATAR_LOAD_COMPLETE, {
      detail: {
        avatar: this.url
      }
    });
    this.dispatchEvent(event);
  }


  onLoadAvatarFail(error: any) {
    const event = new CustomEvent(GitHubAvatar.events.AVATAR_LOAD_ERROR, {
      detail: error
    });
    this.dispatchEvent(event);
  }
}
