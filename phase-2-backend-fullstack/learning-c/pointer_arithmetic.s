	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 15, 0	sdk_version 26, 1
	.globl	_main                           ; -- Begin function main
	.p2align	2
_main:                                  ; @main
	.cfi_startproc
; %bb.0:
	stp	x28, x27, [sp, #-32]!           ; 16-byte Folded Spill
	stp	x29, x30, [sp, #16]             ; 16-byte Folded Spill
	add	x29, sp, #16
	sub	sp, sp, #928
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	.cfi_offset w27, -24
	.cfi_offset w28, -32
	adrp	x8, ___stack_chk_guard@GOTPAGE
	ldr	x8, [x8, ___stack_chk_guard@GOTPAGEOFF]
	ldr	x8, [x8]
	stur	x8, [x29, #-24]
	str	wzr, [sp, #64]
                                        ; kill: def $x8 killed $xzr
	str	xzr, [sp, #48]
	str	xzr, [sp, #40]
	sub	x8, x29, #34
	str	x8, [sp, #48]
	sub	x8, x29, #76
	str	x8, [sp, #40]
	str	wzr, [sp, #60]
	b	LBB0_1
LBB0_1:                                 ; =>This Inner Loop Header: Depth=1
	ldr	w8, [sp, #60]
	subs	w8, w8, #10
	b.ge	LBB0_4
	b	LBB0_2
LBB0_2:                                 ;   in Loop: Header=BB0_1 Depth=1
	ldr	w8, [sp, #60]
	add	w8, w8, #97
	ldr	x9, [sp, #48]
	strb	w8, [x9]
	ldr	w8, [sp, #60]
	mov	w9, #3                          ; =0x3
	mul	w8, w8, w9
	ldr	x9, [sp, #40]
	str	w8, [x9]
	ldr	x8, [sp, #48]
	add	x8, x8, #1
	str	x8, [sp, #48]
	ldr	x8, [sp, #40]
	add	x8, x8, #4
	str	x8, [sp, #40]
	b	LBB0_3
LBB0_3:                                 ;   in Loop: Header=BB0_1 Depth=1
	ldr	w8, [sp, #60]
	add	w8, w8, #1
	str	w8, [sp, #60]
	b	LBB0_1
LBB0_4:
	adrp	x0, l_.str@PAGE
	add	x0, x0, l_.str@PAGEOFF
	bl	_printf
	str	wzr, [sp, #60]
	b	LBB0_5
LBB0_5:                                 ; =>This Inner Loop Header: Depth=1
	ldr	w8, [sp, #60]
	subs	w8, w8, #10
	b.ge	LBB0_8
	b	LBB0_6
LBB0_6:                                 ;   in Loop: Header=BB0_5 Depth=1
	ldr	w8, [sp, #60]
	mov	x11, x8
	ldrsw	x9, [sp, #60]
	sub	x8, x29, #34
	ldrsb	w12, [x8, x9]
	ldr	w8, [sp, #60]
	mov	x10, x8
	ldrsw	x9, [sp, #60]
	sub	x8, x29, #76
	ldr	w8, [x8, x9, lsl #2]
                                        ; kill: def $x8 killed $w8
	mov	x9, sp
	str	x11, [x9]
                                        ; implicit-def: $x11
	mov	x11, x12
	str	x11, [x9, #8]
	str	x10, [x9, #16]
	str	x8, [x9, #24]
	adrp	x0, l_.str.1@PAGE
	add	x0, x0, l_.str.1@PAGEOFF
	bl	_printf
	b	LBB0_7
LBB0_7:                                 ;   in Loop: Header=BB0_5 Depth=1
	ldr	w8, [sp, #60]
	add	w8, w8, #1
	str	w8, [sp, #60]
	b	LBB0_5
LBB0_8:
	adrp	x0, l_.str.2@PAGE
	add	x0, x0, l_.str.2@PAGEOFF
	bl	_printf
	sub	x8, x29, #34
	str	x8, [sp, #48]
	sub	x8, x29, #76
	str	x8, [sp, #40]
	str	wzr, [sp, #60]
	b	LBB0_9
LBB0_9:                                 ; =>This Inner Loop Header: Depth=1
	ldr	w8, [sp, #60]
	subs	w8, w8, #10
	b.ge	LBB0_12
	b	LBB0_10
LBB0_10:                                ;   in Loop: Header=BB0_9 Depth=1
	ldr	w8, [sp, #60]
	mov	x11, x8
	ldr	x8, [sp, #48]
	ldrsb	w12, [x8]
	ldr	w8, [sp, #60]
	mov	x10, x8
	ldr	x8, [sp, #40]
	ldr	w8, [x8]
                                        ; kill: def $x8 killed $w8
	mov	x9, sp
	str	x11, [x9]
                                        ; implicit-def: $x11
	mov	x11, x12
	str	x11, [x9, #8]
	str	x10, [x9, #16]
	str	x8, [x9, #24]
	adrp	x0, l_.str.1@PAGE
	add	x0, x0, l_.str.1@PAGEOFF
	bl	_printf
	ldr	x8, [sp, #48]
	add	x8, x8, #1
	str	x8, [sp, #48]
	ldr	x8, [sp, #40]
	add	x8, x8, #4
	str	x8, [sp, #40]
	b	LBB0_11
LBB0_11:                                ;   in Loop: Header=BB0_9 Depth=1
	ldr	w8, [sp, #60]
	add	w8, w8, #1
	str	w8, [sp, #60]
	b	LBB0_9
LBB0_12:
	ldr	w8, [sp, #64]
	str	w8, [sp, #36]                   ; 4-byte Folded Spill
	ldur	x9, [x29, #-24]
	adrp	x8, ___stack_chk_guard@GOTPAGE
	ldr	x8, [x8, ___stack_chk_guard@GOTPAGEOFF]
	ldr	x8, [x8]
	subs	x8, x8, x9
	b.eq	LBB0_14
	b	LBB0_13
LBB0_13:
	bl	___stack_chk_fail
LBB0_14:
	ldr	w0, [sp, #36]                   ; 4-byte Folded Reload
	add	sp, sp, #928
	ldp	x29, x30, [sp, #16]             ; 16-byte Folded Reload
	ldp	x28, x27, [sp], #32             ; 16-byte Folded Reload
	ret
	.cfi_endproc
                                        ; -- End function
	.section	__TEXT,__cstring,cstring_literals
l_.str:                                 ; @.str
	.asciz	"\n array values using indexing to access: \n"

l_.str.1:                               ; @.str.1
	.asciz	"letters[%d] = %c, numbers[%d] = %d\n"

l_.str.2:                               ; @.str.2
	.asciz	"\n array values using pointer arith to access: \n"

.subsections_via_symbols
