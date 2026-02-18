import { Accordion as r, AccordionContent as l, AccordionItem as i, AccordionTrigger as a } from "./components/ui/accordion.js";
import { AlertDialog as n, AlertDialogAction as p, AlertDialogCancel as d, AlertDialogContent as c, AlertDialogDescription as g, AlertDialogFooter as s, AlertDialogHeader as u, AlertDialogMedia as F, AlertDialogOverlay as A, AlertDialogPortal as f, AlertDialogTitle as x, AlertDialogTrigger as D } from "./components/ui/alert-dialog.js";
import { Button as S, buttonVariants as I } from "./components/ui/button.js";
import { Card as b, CardContent as L, CardDescription as G, CardFooter as R, CardHeader as B, CardTitle as H } from "./components/ui/card.js";
import { Field as P, FieldContent as h, FieldDescription as V, FieldError as v, FieldGroup as w, FieldLabel as y, FieldLegend as E, FieldSeparator as O, FieldSet as U, FieldTitle as j } from "./components/ui/field.js";
import { Form as q, FormControl as z, FormDescription as J, FormField as K, FormItem as N, FormLabel as Q, FormMessage as W, useFormField as X } from "./components/ui/form.js";
import { Input as Z } from "./components/ui/input.js";
import { Item as $, ItemActions as ee, ItemContent as oe, ItemDescription as te, ItemFooter as re, ItemGroup as le, ItemHeader as ie, ItemMedia as ae, ItemSeparator as me, ItemTitle as ne } from "./components/ui/item.js";
import { Label as de } from "./components/ui/label.js";
import { RadioGroup as ge, RadioGroupItem as se } from "./components/ui/radio-group.js";
import { Select as Fe, SelectContent as Ae, SelectGroup as fe, SelectItem as xe, SelectLabel as De, SelectScrollDownButton as Ce, SelectScrollUpButton as Se, SelectSeparator as Ie, SelectTrigger as Te, SelectValue as be } from "./components/ui/select.js";
import { Separator as Ge } from "./components/ui/separator.js";
import { Toaster as Be } from "./components/ui/sonner.js";
import { Tabs as Me, TabsContent as Pe, TabsList as he, TabsTrigger as Ve } from "./components/ui/tabs.js";
import { useAppRoutes as we } from "./hooks/useAppRoutes.js";
import { useAuthBootstrap as Ee } from "./hooks/useAuthBootstrap.js";
import { usePageCrudAuth as Ue } from "./hooks/usePageCrudAuthCheck.js";
import { usePageList as ke } from "./hooks/usePageList.js";
const e = () => ({ enableLocalRoutes: !0 });
export {
  r as Accordion,
  l as AccordionContent,
  i as AccordionItem,
  a as AccordionTrigger,
  n as AlertDialog,
  p as AlertDialogAction,
  d as AlertDialogCancel,
  c as AlertDialogContent,
  g as AlertDialogDescription,
  s as AlertDialogFooter,
  u as AlertDialogHeader,
  F as AlertDialogMedia,
  A as AlertDialogOverlay,
  f as AlertDialogPortal,
  x as AlertDialogTitle,
  D as AlertDialogTrigger,
  S as Button,
  b as Card,
  L as CardContent,
  G as CardDescription,
  R as CardFooter,
  B as CardHeader,
  H as CardTitle,
  P as Field,
  h as FieldContent,
  V as FieldDescription,
  v as FieldError,
  w as FieldGroup,
  y as FieldLabel,
  E as FieldLegend,
  O as FieldSeparator,
  U as FieldSet,
  j as FieldTitle,
  q as Form,
  z as FormControl,
  J as FormDescription,
  K as FormField,
  N as FormItem,
  Q as FormLabel,
  W as FormMessage,
  Z as Input,
  $ as Item,
  ee as ItemActions,
  oe as ItemContent,
  te as ItemDescription,
  re as ItemFooter,
  le as ItemGroup,
  ie as ItemHeader,
  ae as ItemMedia,
  me as ItemSeparator,
  ne as ItemTitle,
  de as Label,
  ge as RadioGroup,
  se as RadioGroupItem,
  Fe as Select,
  Ae as SelectContent,
  fe as SelectGroup,
  xe as SelectItem,
  De as SelectLabel,
  Ce as SelectScrollDownButton,
  Se as SelectScrollUpButton,
  Ie as SelectSeparator,
  Te as SelectTrigger,
  be as SelectValue,
  Ge as Separator,
  Me as Tabs,
  Pe as TabsContent,
  he as TabsList,
  Ve as TabsTrigger,
  Be as Toaster,
  I as buttonVariants,
  e as getRuntimeConfig,
  we as useAppRoutes,
  Ee as useAuthBootstrap,
  X as useFormField,
  Ue as usePageCrudAuth,
  ke as usePageList
};
