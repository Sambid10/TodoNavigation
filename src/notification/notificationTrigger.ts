import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export async function scheduleNotification(title: string, datetime: Date) {
  const oneMinuteBefore = new Date(datetime.getTime() - 1 * 60 * 1000); 
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: oneMinuteBefore.getTime(),
    alarmManager: true, 
  };

  await notifee.createTriggerNotification(
    {
      title: '⏰ Todo Reminder',
      body: `"${title}" is due in 1 minute.`,
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger
  );
}
