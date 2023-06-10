import emptyActivity from "../assets/empty-activity.png";
import emptyItem from "../assets/empty-item.png";

interface EmptyStateProps {
  isActivity?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isActivity }) => {
  return (
    <div data-cy="emptyState-todo" className="flex justify-center items-center">
      <img
        data-cy={!isActivity && "todo-empty-state"}
        src={isActivity ? emptyActivity : emptyItem}
        alt="empty-state"
      />
    </div>
  );
};

export default EmptyState;
