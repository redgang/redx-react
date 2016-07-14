let menuLists = [
  {
    title: '系统管理',
    url: '/system',
    icon: 'home',
    when: '',
    children: [
      {
        title: '用户列表',
        url: '/system/list',
        icon: 'wb-dashboard',
        when: '',
      }
    ]
  }
]

if(__DEV__){
   menuLists.push(
     {
      title: 'docs',
      url: '/docs',
      icon: 'user',
      when: '',
      children: [
        {
          title: 'docs',
          url: '/docs',
          icon: 'wb-dashboard',
          when: '',
        }
      ]
    } 
   )
}

export default menuLists