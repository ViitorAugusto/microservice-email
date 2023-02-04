import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = new Date();
    return next.handle().pipe(
      tap(() => {
        const req = context.switchToHttp().getRequest();
        console.log(`URL:${req.url}`);
        console.log(`Method:${req.method}`);
        console.log(`Request took ${new Date().getTime() - dt.getTime()} ms`);
      }),
    );
  }
}
