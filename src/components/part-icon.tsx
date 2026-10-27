import { Bot, Layers, LineChart, Users } from "lucide-react";

/** 대분류마다 고정된 아이콘. 타일·섹션 헤더·내비게이션이 같은 아이콘을 써서 눈으로 바로 잇게 합니다. */
export function PartIcon({ no, className }: { no: number; className?: string }) {
  switch (no) {
    case 1:
      return <Bot className={className} />;
    case 2:
      return <Users className={className} />;
    case 3:
      return <Layers className={className} />;
    default:
      return <LineChart className={className} />;
  }
}
