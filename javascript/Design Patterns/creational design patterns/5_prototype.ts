
interface Clonable {
  clone():any;
}

class Employees implements Clonable {
  private empList: String[];

  constructor(...arg:String[]) {
    this.empList = arg || [];
  }

  loadData() {
    this.empList.push("Pankaj");
		this.empList.push("Raj");
		this.empList.push("David");
		this.empList.push("Lisa");
  }

  getEmpList():String[] {
		return this.empList;
	}

  clone():any {
    const list = JSON.parse(JSON.stringify(this.empList));
    return new Employees(list);
  }
}

function prototypePatternTest () {
  const emps = new Employees();
  emps.loadData();

  const emps_1 = emps.clone();
  const emps_2 = emps.clone();

  const list_1:String[] = emps_1.getEmpList();
  list_1.push('Dye');

  const list_2:String[] = emps_2.getEmpList();
  list_2.splice(1, 1);

  console.log('emps', emps.getEmpList());
  console.log('emps_1', list_1);
  console.log('emps_2', list_2);
  
}

