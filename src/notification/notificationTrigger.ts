import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { Todo } from '../screens/Todo';

export async function scheduleNotification(
  title: string,
  datetime: Date,
  todoId: string,
  todo: Todo,
): Promise<string> {
  const twoMinuteBefore = new Date(datetime.getTime() - 2 * 60 * 1000);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: twoMinuteBefore.getTime(),
  };

  const notificationId = await notifee.createTriggerNotification(
    {
      title: '⏰ Todo Reminder!!',
      body: `"${title}" is due in 2 minute.`,
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

  return notificationId;
}
