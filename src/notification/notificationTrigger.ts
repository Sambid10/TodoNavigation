import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
// import { Todo } from '../screens/Todo';
import { Todo } from '../screens/Todo';
export async function scheduleNotification(
  title: string,
  datetime: Date,
  todoId: number,
  todo: Todo,
) {
  const oneMinuteBefore = new Date(datetime.getTime() - 1 * 60 * 1000);
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: oneMinuteBefore.getTime(),
    alarmManager: true,
  };
  await notifee.createTriggerNotification(
    {
      title: '⏰ Todo Reminder!!',
      body: `"${title}" is due in 1 minute.`,
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
      },
      data: {
        todoId,
        todo: JSON.stringify({
          ...todo,
          datetime: todo.datetime.toDate().toISOString(),
        }),
      },
    },
    trigger,
  );
}
