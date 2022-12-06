const Now = Date.now();
const min = 2*60*1000;

export const data = [
  {
    id: '123',
    created: Now - min * 2,
    content: 'Какой-то пост относящийся к теме React',
  },
  {
    id: '124',
    created: Now - min,
    content: 'Еще какой-то пост относящийся к теме React',
  }
]
