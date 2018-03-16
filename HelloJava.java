

// class User // 用户类，也就是 User 表中含有的字段
// {
//   private int _id;
//   pubulic int _id
//   {
//     get {return _id;}
//     set {_id = value;}
//   }

//   private string _name;
//   public string Name
//   {
//     get { return _name; }
//     set { _name = value; }
//   }
// }

// class SqlserverUser // 用户操作 User 表的 SQL 语句，假设只有新增和得到用户两个操作
// {
//   public void Insert(User user)
//   {
//     System.out.printIn("在 SQL Sserver 中给 User 表增加一条记录");
//   }

//   public User GetUser( int id )
//   {
//     Console.WriteLine("在 SQL Server 中根据 ID 得到 User 表一条记录");
//     return null;
//   }
// }

// static void Main( stringp[] args )
// {
//   User user = new User();
//   SqlserverUser su = new SqlserverUser();

//   su.Insert(user); // 插入一个用户
//   su.GetUser(1);   // 得到 ID 为 1 的用户
//   Console.Read();
// }


//////////////////////////
// interface IUser
// {
//   void Insert(User user);
//   User GetUser(int id);
// }

// class SqlserverUser : IUser
// {
//   public void Insert(User user)
//   {
//     Console.writeLine("在 SQL Sserver 中给 User 表增加一条记录");
//   }

//   public User GetUser( int id )
//   {
//     Console.WriteLine("在 SQL Server 中根据 ID 得到 User 表一条记录");
//     return null;
//   }
// }

// class AccessUser : IUser
// {
//   public void Insert(User user)
//   {
//     Console.writeLine("在 Access 中给 User 表增加一条记录");
//   }

//   public User GetUser( int id )
//   {
//     Console.WriteLine("在 Access 中根据 ID 得到 User 表一条记录");
//     return null;
//   }
// }

// interface IFactory
// {
//   IUser CreateUser();
// }

// class SqlServerFactory : IFactory
// {
//   public IUser CreateUser()
//   {
//     return new SqlserverUser();
//   }
// }
// class AccessFactory : IFactory
// {
//   public IUser CreateUser()
//   {
//     return new AccessUser();
//   }
// }

// static void Main(string[] args)
// {
//   User user = new User();

//   IFactory factory = new SqlServerFactory();

//   IUser iu = factory.CreateUser();

//   iu.Insert(user);
//   iu.GetUser(1);
// }


public class HelloJava{
  public static void main(String[] args) {
    System.out.print("Hello Java 1");
  }
}