//exercise 1
interface Fun<a, b> {
  f: ((_: a) => b)
  then: //TODO 1.1
}

let id = <a>(): Fun<a, a> => Fun((x: a) => x)

let Fun = <a, b>(f: (_: a) => b): Fun<a, b> => {
  return {
    f: f,
    then: //TODO 1.2
  }
}

//exercise 2
let map_Fun = <a, b>(f: Fun<a, b>): Fun<Fun<number, a>, Fun<number ,b>> =>
  //TODO 2

//exercise 3
type List<a> = {
  kind: "empty"
} | {
  kind: "cons",
  head: a,
  tail: List<a>
}

let Empty = <a>(): List<a> => ({ kind: "empty" })

let Cons = <a>(head: a, tail: List<a>): List<a> => ({
  kind: "cons",
  head: head,
  tail: tail
})

let map_List = <a, b>(f: Fun<a, b>): Fun<List<a>, List<b>> =>
  //TODO 3.1

let join_List = <a>(): Fun<List<List<a>>, List<a>> =>
  //TODO 3.2

let unit_List = <a>(): Fun<a, List<a>> =>
  //TODO 3.3

//exercise 4
type Id<a> = //TODO 4.1

let map_Id = <a, b>(f: Fun<a, b>): Fun<Id<a>, Id<b>> => f
let unit_Id = <a>(): Fun<a, Id<a>> => id<a>()
let join_Id = <a>(): Fun<Id<Id<a>>, Id<a>> => id<a>()

let bind_Id = <a, b>(id: Id<a>, f: Fun<a, Id<b>>): Id<b> => //TODO 4



//exercise 5
type Option<a> = {
  kind: "none"
} | {
  kind: "some"
  value: a
}

type Unit = {}

let Some = <a>(): Fun<a, Option<a>> =>
  Fun((x: a): Option<a> => ({ kind: "some", value: x }))

let None = <a>(): Fun<Unit, Option<a>> =>
  Fun((_: Unit): Option<a> => ({ kind: "none" }))

let map_Option = <a, b>(f: Fun<a, b>): Fun<Option<a>, Option<b>> =>
  Fun((opt: Option<a>) => opt.kind == "none" ? None<b>().f(({})) : Some<b>().f(f.f(opt.value)))

let join_Option = <a>(): Fun<Option<Option<a>>, Option<a>> =>
  Fun((opt: Option<Option<a>>) => opt.kind == "none" ? 
    None<a>().f({}) : opt.value)

let return_Option = <a>(): Fun<a, Option<a>> => Some<a>()

interface DataSource<a> {
  ip: string
  resource: a
}

interface BankAccount {
  accountNumber: string,
  balance: number
}


let getHttp = <a>(ip: string, server: DataSource<a>): Option<a> =>
  server.ip != ip ? None<a>().f({}) :
  Math.random() < 0.25 ? None<a>().f({}) :
  Some<a>().f(server.resource)

let postHttp = <a>(ip: string, server: DataSource<a>, data: a): Option<DataSource<a>> =>
  server.ip != ip ? None<DataSource<a>>().f({}) :
  Math.random() < 0.3 ? None<DataSource<a>>().f({}) :
  Some<DataSource<a>>().f({...server, resource: data})


let bind_Option = <a, b>(opt: Option<a>, f: Fun<a, Option<b>>): Option<b> =>
  map_Option<a, Option<b>>(f).then(join_Option()).f(opt)

type BankServer = DataSource<BankAccount>

let testAccount: BankAccount = {
  accountNumber: "038942962962",
  balance: 2500
}

let bankServer: BankServer = {
  ip: "192.168.0.1",
  resource: testAccount
}

let withdraw = (amount: number, bank: BankServer): Option<BankServer> =>
  //TODO 5
