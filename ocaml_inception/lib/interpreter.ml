open Env
open Lexer
open Parser
open Type_check
open Evaluate

let interpret s =
  let tokens = lex s in
  let ast, rest = parse tokens in
  if not (rest = []) then failwith "parse: unexpected trailing tokens" ;
  let typ = infer_type empty empty ast in
  let value = evaluate empty ast in
  (typ, value)
