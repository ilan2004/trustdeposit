import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Msg {
  id: string;
  author: string;
  text: string;
  ts: string;
  self?: boolean;
}

export function MessageThread({ messages }: { messages: Msg[] }) {
  return (
    <ScrollArea className="h-80 w-full border rounded-md p-4 space-y-4">
      {messages.map((m) => (
        <div key={m.id} className="flex gap-2 items-start">
          <Avatar className="size-8">
            <AvatarFallback>{m.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium flex gap-2">
              {m.author}
              <span className="text-muted-foreground text-xs">{m.ts}</span>
            </p>
            <p className="text-sm whitespace-pre-wrap">{m.text}</p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
