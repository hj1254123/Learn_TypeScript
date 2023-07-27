// 下面指定了该函数返回的是一个类型为 T 的 Promise
const getJSON = <T>(config: { url: string; headers?: { [key: string]: string } }): Promise<T> => {
  const fetchConfig = {
    method: 'GET',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {})
  };
  // 这里 response.json 返回的是一个 Promise，泛型 T 是指定给这个 Promise的
  return fetch(config.url, fetchConfig).then<T>(response => response.json());
};

type LoadUserResponse = {
  user: {
    name: string;
    email: string;
  }[];
};

function loaderUser() {
  return getJSON<LoadUserResponse>({ url: 'https://example.com/users' });
}

loaderUser().then(data => {
  data.user.forEach(item => {
    // 提示都有！
    console.log(item.email)
    console.log(item.name)
  });
})
