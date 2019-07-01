using System;

namespace TodoSPA.Models
{
    public class TodoItem
    {
        public TodoItem()
        {
            CreationTime = DateTime.Now;
        }

        public long Id { get; set; }
        public DateTime CreationTime { get; protected set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public string Owner { get; set; }
    }
}