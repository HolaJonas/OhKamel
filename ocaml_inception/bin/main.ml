
open Js_of_ocaml
open Ocaml_inception.Interpreter
open Ocaml_inception.Type_check
open Ocaml_inception.Types

let rec string_of_ty (t : ty) : string =
	match t with
	| Int ->
			"int"
	| Bool ->
			"bool"
	| TVar i ->
			"'a" ^ string_of_int i
	| Arrow (t1, t2) ->
			"(" ^ string_of_ty t1 ^ " -> " ^ string_of_ty t2 ^ ")"
	| Tuple ts ->
			"(" ^ String.concat " * " (List.map string_of_ty ts) ^ ")"

let rec string_of_value (v : value) : string =
	match v with
	| Ival i ->
			string_of_int i
	| Bval b ->
			string_of_bool b
	| Tuple vs ->
			"(" ^ String.concat ", " (List.map string_of_value vs) ^ ")"
	| Closure _ | Rclosure _ ->
			"<fun>"

let run_code (code : string) : string =
	try
		let (inferred_ty, sub), value = interpret code in
		let resolved_ty = apply_substitution sub inferred_ty in
		"type: " ^ string_of_ty resolved_ty ^ "\nvalue: " ^ string_of_value value
	with Failure msg -> "error\n" ^ msg

let run_js (code : Js.js_string Js.t) : Js.js_string Js.t =
	Js.string (run_code (Js.to_string code))

let () =
	let api = Js.Unsafe.obj [|("run", Js.Unsafe.inject (Js.wrap_callback run_js))|] in
	Js.Unsafe.set Js.Unsafe.global "OcamlInception" api
