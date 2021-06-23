import Mock from 'mockjs'
const Random = Mock.Random
Mock.mock('/shops', {
  'swiper|30': [{
    'imgPath': Random.image('65x65', 'red', 'png', ''),
    'name': 'F+牛肉饭'
  }
  ]
})
