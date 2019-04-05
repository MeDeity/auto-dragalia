import { store } from '@/store';
import { taskRegistry } from '@/tasks';
import { wait } from '@/utils/wait';

export async function runTaskForever(): Promise<void> {
  if (store.currentTask !== undefined) {
    const taskName: string = store.currentTask;
    const handler: (() => void) | undefined = taskRegistry[taskName];
    if (!handler) {
      throw new Error(`Unknown task: ${taskName}`);
    }
    console.log(`运行任务: ${taskName}`);
    try {
      await handler();
    } catch (err) {
      console.show();
      console.error(err);
      store.currentTask = undefined;
    }
  }
  await wait(1000);
  await runTaskForever();
}
